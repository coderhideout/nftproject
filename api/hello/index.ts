import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { get, getSync } from '@andreekeberg/imagedata'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
        //string htmlFilePath = Path.Combine(context.FunctionAppDirectory, "Data", "test.html");
        var fileImage = context.executionContext.functionDirectory + "/data/test.png";
        var data = getSync(fileImage);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            input: name,
            dir : context.executionContext.functionDirectory,
            file: fileImage,
            image: data,
            message: responseMessage
        }
    };

};

export default httpTrigger;