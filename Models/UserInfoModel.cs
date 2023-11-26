using System.Text.Json.Serialization;

namespace kithtokin_web.Models
{
    public class UserInfoModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string WhatsAppNumber { get; set; }
        public string ContryOfResidence { get; set; }
        public string CityOfResidence { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ResidenceTypeEnum ResidenceType { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public YearsAbroadEnum YearsAbroad { get; set; }
        public IList<LanguageEnum> Languages { get; set; }
        public IList<CommunicationMethodEnum> CommunicationMethods { get; set; }

        public string CallTime { get; set; }
        public IList<ServiceTypeEnum> ServiceTypes { get; set; }

    }
}
