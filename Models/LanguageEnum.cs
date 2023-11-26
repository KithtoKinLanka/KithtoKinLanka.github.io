using System.Text.Json.Serialization;

namespace kithtokin_web.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum LanguageEnum
    {
        English = 0,
        Sinhala = 1,
        Tamil = 2,
    }
}
