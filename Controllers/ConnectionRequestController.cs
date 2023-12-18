using kithtokin_web.BusinessLogicLayer;
using kithtokin_web.Models;
using Microsoft.AspNetCore.Mvc;
//using Newtonsoft.Json;
using System.Text.Json;

namespace kithtokin_web.Controllers
{
    public class ConnectionRequestController : Controller
    {
        private readonly IClientService _clientService;

        public ConnectionRequestController(IClientService clientService)
        {
            this._clientService = clientService;
        }
        public IActionResult Index()
        {
            return View();
        }

        
        [HttpPost]
        public IActionResult SaveFormData([FromBody] ClientInfoModel userInfo)
        {
            try
            {
                string confirmationId = _clientService.AddClientWithServiceData(userInfo);
                return Json(new { success = true, confirmationId = confirmationId, message = "Data saved successfully" });
            }
            catch (Exception e)
            {
                return Json(new { success = false, confirmationId = "0", message = "Could not save data", stack = e.InnerException?.ToString() });
            }
            
        }


    }
}
    