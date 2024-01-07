using System.Text.Json.Serialization;

namespace kithtokin_web.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum CommunicationMethodEnum
    {
        Email = 0,
        WhatsApp_Text = 1,
        WhatsApp_Call = 2,
    }
}
