using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace kithtokin_web.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ServiceTypeEnum
    {
        [Display(Name = "Family connection and care")]
        Family_connection_and_care = 0,
        [Display(Name = "Property maintenance")]
        Property_maintenance = 1,
        [Display(Name = "Holiday arrangements")]
        Holiday_arrangements = 2,
        [Display(Name = "Legal documentatio")]
        Legal_documentation = 3,
        [Display(Name = "Tasks at government departments")]
        Tasks_at_government_departments = 4,
        [Display(Name = "Social work")]
        Social_work = 5,
        [Display(Name = "A requirement specific to me")]
        A_requirement_specific_to_me = 6
    }
}
