using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace kithtokin_web.Models.DBEntities
{
    public class Service
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string ServiceName {  get; set; }

        [Required]
        [StringLength(20)]
        public string Languages { get; set; }
        [Required]
        [StringLength(50)]
        public string CommunicationMethods { get; set; }
        [StringLength(20)]
        public string CallTime { get; set; }

        [ForeignKey("ClientId")]
        public Client Client { get; set; }
    }
}
