using kithtokin_web.DataAccessLayer;
using kithtokin_web.Models;
using kithtokin_web.Models.DBEntities;
using System.Collections.ObjectModel;
using System.Threading.Tasks.Dataflow;

namespace kithtokin_web.BusinessLogicLayer
{
    public class ClientService : IClientService
    {
        private KithtoKinDBContext _context { get; }
        public ClientService(KithtoKinDBContext context)
        {
            _context = context;
        }

        public IList<Client> GetClients()
        {
            var clients = _context.Clients.ToList();
            return clients;
        }

        public void AddClientWithServiceData(ClientInfoModel clientInfoModel)
        {
            try
            {
                ICollection<Service> services = new Collection<Service>();
                foreach(var svc in clientInfoModel.ServiceTypes)
                {
                    services.Add(new Service { 
                        ServiceName = svc.ToString(),
                        Languages = String.Join(";",clientInfoModel.Languages.ToList()),
                        CommunicationMethods = String.Join(";", clientInfoModel.CommunicationMethods.ToList()),
                        CallTime = clientInfoModel.CallTime,
                    });
                }
                Client newClient = new Client
                {
                    Name = clientInfoModel.Name,
                    Email = clientInfoModel.Email,
                    WhatsAppNumber = clientInfoModel.WhatsAppNumber,
                    ContryOfResidence = clientInfoModel.ContryOfResidence,
                    CityOfResidence = clientInfoModel.CityOfResidence,
                    ResidenceType = clientInfoModel.ResidenceType.ToString(),
                    YearsAbroad = clientInfoModel.YearsAbroad.ToString(),
                    Services = services

                };

                _context.Clients.Add(newClient);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
