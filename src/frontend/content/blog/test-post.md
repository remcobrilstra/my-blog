---
title: Building a Simple RAG Pipeline from Scratch in C#
date: '2024-12-30'
description: In this tutorial, we'll walk through creating a Retrieval-Augmented Generation (RAG) pipeline from the ground up using C#. RAG is a powerful technique that combines the benefits of large language models with your own data, enabling more accurate and contextual responses.
image: /images/desktop-code-screen.png
tags: ['tag1', 'tag2']
---

In this tutorial, we'll walk through creating a Retrieval-Augmented Generation (RAG) pipeline from the ground up using C#. RAG is a powerful technique that combines the benefits of large language models with your own data, enabling more accurate and contextual responses.

## What is RAG?

Retrieval-Augmented Generation is an AI architecture that enhances large language models by providing them with relevant context retrieved from a knowledge base. Instead of relying solely on the model's training data, RAG allows you to supplement responses with your own curated information.

## Prerequisites

Before we begin, make sure you have:

- .NET 7.0 or later installed
- Visual Studio 2022 or VS Code
- Basic understanding of C# and async programming
- OpenAI API key (for demonstration purposes)

## Project Setup

First, create a new console application and install the required NuGet packages:

```csharp
dotnet new console -n RagPipeline
cd RagPipeline
dotnet add package Azure.AI.OpenAI
dotnet add package Microsoft.ML.Tokenizers
dotnet add package NEST
```

## Step 1: Document Processing

Let's start by creating a document processor that will handle our input text:

```csharp
public class Document
{
    public string Id { get; set; }
    public string Content { get; set; }
    public Dictionary<string, double> Embedding { get; set; }
}

public class DocumentProcessor
{
    private readonly ITokenizer _tokenizer;
    
    public DocumentProcessor()
    {
        // Initialize the tokenizer with BERT vocabulary
        _tokenizer = new BertTokenizer();
    }

    public IEnumerable<Document> ProcessDocument(string text, int chunkSize = 512)
    {
        // Split text into smaller chunks
        var chunks = ChunkText(text, chunkSize);
        
        return chunks.Select((chunk, index) => new Document
        {
            Id = $"chunk_{index}",
            Content = chunk,
            Embedding = null // Will be populated later
        });
    }

    private IEnumerable<string> ChunkText(string text, int chunkSize)
    {
        var tokens = _tokenizer.Tokenize(text);
        var chunks = new List<string>();
        
        for (int i = 0; i < tokens.Count; i += chunkSize)
        {
            var chunkTokens = tokens.Skip(i).Take(chunkSize).ToList();
            chunks.Add(_tokenizer.Decode(chunkTokens));
        }
        
        return chunks;
    }
}
```

## Step 2: Vector Store Integration

Next, we'll create a vector store using Elasticsearch to store and retrieve our document embeddings:

```csharp
public class VectorStore
{
    private readonly ElasticClient _client;
    
    public VectorStore(string connectionString)
    {
        var settings = new ConnectionSettings(new Uri(connectionString))
            .DefaultIndex("documents");
        
        _client = new ElasticClient(settings);
    }

    public async Task IndexDocument(Document document)
    {
        await _client.IndexDocumentAsync(document);
    }

    public async Task<IEnumerable<Document>> SearchSimilar(
        double[] queryEmbedding, 
        int k = 3)
    {
        var response = await _client.SearchAsync<Document>(s => s
            .Query(q => q
                .Script(sc => sc
                    .Script(script => script
                        .Source("cosineSimilarity(params.query_vector, doc['embedding'])")
                        .Params(p => p.Add("query_vector", queryEmbedding))))));
        
        return response.Documents.Take(k);
    }
}
```

## Step 3: Embedding Generation

We'll use OpenAI's embedding model to generate vector representations:

```csharp
public class EmbeddingGenerator
{
    private readonly OpenAIClient _client;
    
    public EmbeddingGenerator(string apiKey)
    {
        _client = new OpenAIClient(apiKey);
    }

    public async Task<double[]> GenerateEmbedding(string text)
    {
        var response = await _client.GetEmbeddingsAsync(
            "text-embedding-ada-002",
            new EmbeddingsOptions(text));
        
        return response.Value.Data[0].Embedding.ToArray();
    }
}
```

## Step 4: RAG Pipeline Implementation

Now, let's put it all together in our main RAG pipeline:

```csharp
public class RagPipeline
{
    private readonly DocumentProcessor _documentProcessor;
    private readonly EmbeddingGenerator _embeddingGenerator;
    private readonly VectorStore _vectorStore;
    private readonly OpenAIClient _llmClient;

    public RagPipeline(string openAiKey, string elasticConnectionString)
    {
        _documentProcessor = new DocumentProcessor();
        _embeddingGenerator = new EmbeddingGenerator(openAiKey);
        _vectorStore = new VectorStore(elasticConnectionString);
        _llmClient = new OpenAIClient(openAiKey);
    }

    public async Task IndexDocument(string text)
    {
        // Process document into chunks
        var documents = _documentProcessor.ProcessDocument(text);
        
        // Generate embeddings for each chunk
        foreach (var doc in documents)
        {
            var embedding = await _embeddingGenerator.GenerateEmbedding(doc.Content);
            doc.Embedding = embedding.ToDictionary(i => i.ToString(), i => (double)i);
            await _vectorStore.IndexDocument(doc);
        }
    }

    public async Task<string> Query(string question)
    {
        // Generate embedding for the question
        var questionEmbedding = await _embeddingGenerator.GenerateEmbedding(question);
        
        // Retrieve similar documents
        var relevantDocs = await _vectorStore.SearchSimilar(questionEmbedding);
        
        // Construct prompt with context
        var context = string.Join("\n\n", relevantDocs.Select(d => d.Content));
        var prompt = $"Context:\n{context}\n\nQuestion: {question}\nAnswer:";
        
        // Generate response using LLM
        var completions = await _llmClient.GetCompletionsAsync(
            "gpt-4",
            new CompletionsOptions(prompt));
        
        return completions.Value.Choices[0].Text;
    }
}
```

## Usage Example

Here's how to use the RAG pipeline:

```csharp
static async Task Main(string[] args)
{
    var pipeline = new RagPipeline(
        "your-openai-key",
        "http://localhost:9200");

    // Index some documents
    await pipeline.IndexDocument(File.ReadAllText("document1.txt"));
    await pipeline.IndexDocument(File.ReadAllText("document2.txt"));

    // Query the system
    var answer = await pipeline.Query(
        "What are the key features of our product?");
    Console.WriteLine(answer);
}
```

## System Architecture

Here's a visual representation of our RAG pipeline:

<antArtifact identifier="rag-diagram" type="application/vnd.ant.mermaid" title="RAG Pipeline Architecture Diagram">
flowchart LR
    A[Input Document] --> B[Document Processor]
    B --> C[Chunk Generator]
    C --> D[Embedding Generator]
    D --> E[Vector Store]
    F[User Query] --> G[Query Embedding]
    G --> E
    E --> H[Context Retrieval]
    H --> I[LLM]
    I --> J[Response]