using kithtokin_web.DataAccessLayer;
using kithtokin_web.Models;
using kithtokin_web.Models.DBEntities;
using System.Collections.ObjectModel;
using System.Text;
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

        string IClientService.AddClientWithServiceData(ClientInfoModel clientInfoModel)
        {
            try
            {
                ICollection<Service> services = new Collection<Service>();
                string reqid = getUniqueRequestId();
                foreach(var svc in clientInfoModel.ServiceTypes)
                {
                    services.Add(new Service { 
                        ServiceName = svc.ToString(),
                        Languages = String.Join(";",clientInfoModel.Languages.ToList()),
                        CommunicationMethods = String.Join(";", clientInfoModel.CommunicationMethods.ToList()),
                        CallTime = String.Join(";", clientInfoModel.CallTime.ToList()),
                        RequestID = reqid,
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
                    OtherResidentType = clientInfoModel.ResidentTypeOtherText,
                    YearsAbroad = clientInfoModel.YearsAbroad.ToString(),
                    Services = services

                };

                _context.Clients.Add(newClient);
                _context.SaveChanges();
                return reqid;
            }
            catch (Exception)
            {

                throw;
            }
        }

        private string getUniqueRequestId()
        {
            StringBuilder builder = new StringBuilder();
            Enumerable
               .Range(65, 26)
                .Select(e => ((char)e).ToString())
                .Concat(Enumerable.Range(97, 26).Select(e => ((char)e).ToString()))
                .Concat(Enumerable.Range(0, 10).Select(e => e.ToString()))
                .OrderBy(e => Guid.NewGuid())
                .Take(11)
                .ToList().ForEach(e => builder.Append(e));
            return builder.ToString();
        }

    }
}
