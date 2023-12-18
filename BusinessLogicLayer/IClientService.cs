using kithtokin_web.Models;
using kithtokin_web.Models.DBEntities;

namespace kithtokin_web.BusinessLogicLayer
{
    public interface IClientService
    {
        IList<Client> GetClients();
        string AddClientWithServiceData(ClientInfoModel clientInfoModel);
    }
}
