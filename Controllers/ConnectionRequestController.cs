using kithtokin_web.Models;
using Microsoft.AspNetCore.Mvc;
//using Newtonsoft.Json;
using System.Text.Json;

namespace kithtokin_web.Controllers
{
    public class ConnectionRequestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        
        [HttpPost]
        public IActionResult SaveFormData([FromBody] UserInfoModel userInfo)
        {
            
            return Json(new { success = true, message = "Data saved successfully" });
        }


    }
}
    