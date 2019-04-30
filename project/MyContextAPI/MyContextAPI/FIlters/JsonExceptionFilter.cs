using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MyContextAPI.Model.Model; 

namespace MyContextAPI.FIlters
{
    public class JsonExceptionFilter : IExceptionFilter
    {
        private readonly IHostingEnvironment _env;

        public JsonExceptionFilter(IHostingEnvironment env)
        {
            _env = env;
        }

        public void OnException(ExceptionContext context)
        {
            var error = new APIError();
            if (_env.IsDevelopment())
            {
                error.Message = context.Exception.Message;
                error.Details = context.Exception.StackTrace;
            }
            else
            {
                error.Message = "A server error occurred.";
                error.Details = context.Exception.Message;
            }          
           
            context.Result = new ObjectResult(error)
            {
                StatusCode=500
            };
        }
    }
}
