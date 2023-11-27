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
            _clientService.AddClientWithServiceData(userInfo);
            return Json(new { success = true, message = "Data saved successfully" });
        }


    }
}
    