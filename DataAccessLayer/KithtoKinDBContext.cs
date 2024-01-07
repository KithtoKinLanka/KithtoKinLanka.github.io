using kithtokin_web.Models.DBEntities;
using Microsoft.EntityFrameworkCore;

namespace kithtokin_web.DataAccessLayer
{
    public class KithtoKinDBContext : DbContext
    {
        public KithtoKinDBContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Service> Services { get; set; }
    }
}
