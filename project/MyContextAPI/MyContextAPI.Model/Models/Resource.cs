using Newtonsoft.Json;

namespace MyContextAPI.Model.Models
{
    public abstract class Resource
    {[JsonProperty(Order=-2)]
    public string Href { get; set; }
    }
}
