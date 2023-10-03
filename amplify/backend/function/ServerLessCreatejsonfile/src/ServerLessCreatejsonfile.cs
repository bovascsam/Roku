using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.IO;
using Octokit;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Util;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace ServerLessCreatejsonfile
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class ServerLessCreatejsonfile
    {
        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        /// <remarks>
        /// If you rename this function, you will need to update the invocation shim
        /// to match if you intend to test the function with 'amplify mock function'
        /// </remarks>
#pragma warning disable CS1998
        public async Task<APIGatewayProxyResponse> LambdaHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var response = new APIGatewayProxyResponse {
                Headers = new Dictionary<string, string> {
                    { "Access-Control-Allow-Origin", "*" },
                    { "Access-Control-Allow-Headers", "*" }
                }
            };

            string contentType = null;
            request.Headers?.TryGetValue("Content-Type", out contentType);

            switch (request.HttpMethod) {
                case "GET":
                    context.Logger.LogLine($"Get Request: {request.Path}\n");
                    var downloadresponse=await Get4rmS3Async("rokulibrary","roku.json");
                    response.StatusCode = (int)HttpStatusCode.OK;
                    response.Body = downloadresponse;
                    response.Headers["Content-Type"] = "application/json";
                    break;
                case "POST":
                    context.Logger.LogLine($"Post Request: {request.Path}\n");
                    if (!String.IsNullOrEmpty(contentType)) {
                        context.Logger.LogLine($"Content type: {contentType}");
                    }
                    context.Logger.LogLine($"Body: {request.Body}");
                    // string jsondata = System.Text.Json.JsonSerializer.Serialize(request.Body);

                    //Works in local
                    // string path="C:/Users/awsApp/";
                    // var filePath = Path.Combine(path, "output.json");                    
                    // // Write that JSON to txt file,  
                    // System.IO.File.WriteAllText(filePath, jsondata);
                    //--------------------------------------------------

                    // Github upload
//                     var gitHubClient = new GitHubClient(new ProductHeaderValue("AWSApp"));
//                     gitHubClient.Credentials = new Credentials("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");
// string jsondata=request.Body;
                    // var sb = new StringBuilder("---");
                    // sb.AppendLine();
                    // sb.AppendLine($"date: \"2021-05-01\"");
                    // sb.AppendLine($"title: \"My new fancy updated post\"");
                    // sb.AppendLine("tags: [csharp, azure, dotnet]");
                    // sb.AppendLine("---");
                    // sb.AppendLine();

                    // sb.AppendLine("The heading for my first post");
                    // sb.AppendLine();

                    // var (owner, repoName, filePath, branch) = ("bovascsam", "project.roku", 
                    //         "output.json", "main");

                    // var fileDetails = await gitHubClient.Repository.Content.GetAllContentsByRef(owner, repoName,filePath, branch);

                    // var updateResult = await gitHubClient.Repository.Content.UpdateFile(owner, repoName, filePath,
                    //     new UpdateFileRequest("My updated file", jsondata, fileDetails.First().Sha));

                    // await gitHubClient.Repository.Content.CreateFile(
                    //     owner, repoName, filePath,
                    //     new CreateFileRequest($"First commit for {filePath}", jsondata, branch));    
                    //-------End ------------------

                    var uploadresponse=await WriteToS3Async("rokulibrary","roku.json",request.Body,context);
                    response.StatusCode = (int)HttpStatusCode.OK;
                    response.Body = "{ \"message\": \""+uploadresponse+"\" }";
                    response.Headers["Content-Type"] = "application/json";
                    break;
                case "PUT":
                    context.Logger.LogLine($"Put Request: {request.Path}\n");
                    if (!String.IsNullOrEmpty(contentType)) {
                        context.Logger.LogLine($"Content type: {contentType}");
                    }
                    context.Logger.LogLine($"Body: {request.Body}");
                    response.StatusCode = (int)HttpStatusCode.OK;
                    break;
                case "DELETE":
                    context.Logger.LogLine($"Delete Request: {request.Path}\n");
                    response.StatusCode = (int)HttpStatusCode.OK;
                    break;
                default:
                    context.Logger.LogLine($"Unrecognized verb {request.HttpMethod}\n");
                    response.StatusCode = (int)HttpStatusCode.BadRequest;
                    break;
            }

            return response;
        }
        private async System.Threading.Tasks.Task<string> WriteToS3Async(string bucket, string path, string content, ILambdaContext context)
        {
            try
            {
                using (var client = new AmazonS3Client(Amazon.RegionEndpoint.USEast1))
                {
                    var request = new PutObjectRequest
                    {
                        BucketName = bucket,
                        Key = path,
                        ContentBody = content
                    };
                    var response = await client.PutObjectAsync(request);

                    return "true";
                }
            }
            catch (Exception ex)
            {
                context.Logger.LogLine("Exception in PutS3Object:" + ex.Message);
                return ex.Message;
            }
        }

        private async System.Threading.Tasks.Task<string> Get4rmS3Async (string bucket,string path){

            

            using (var client = new AmazonS3Client(Amazon.RegionEndpoint.USEast1))
                {
                    var request = new GetObjectRequest
                        {
                            BucketName = bucket,
                            Key = path
                        };
                        var response = await client.GetObjectAsync(request);

                    using (StreamReader reader = new StreamReader(response.ResponseStream))
                    {
                        string contents = reader.ReadToEnd();
                        Console.WriteLine("Object - " + response.Key);
                        Console.WriteLine(" Version Id - " + response.VersionId);
                        Console.WriteLine(" Contents - " + contents);
                        return contents;
                    }
                }


        }
    }
    

    
}
