using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace kithtokin_web.Models.DBEntities
{
    public class Client
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }

        [StringLength(15)]
        public string WhatsAppNumber { get; set; }
        [Required]
        [StringLength(50)]
        public string ContryOfResidence { get; set; }
        [Required]
        [StringLength(50)]
        public string CityOfResidence { get; set; }
        [Required]
        [StringLength(20)]
        public string ResidenceType { get; set; }

        [StringLength(100)]
        public string? OtherResidentType { get; set; }
        [StringLength(25)]
        public string YearsAbroad { get; set; }

        public ICollection<Service> Services { get; set; }
        
    }
}
