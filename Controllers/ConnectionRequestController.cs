using Microsoft.AspNetCore.Mvc;

namespace kithtokin_web.Controllers
{
    public class ConnectionRequestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
