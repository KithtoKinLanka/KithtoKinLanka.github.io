using Microsoft.AspNetCore.Mvc;

namespace kithtokin_web.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
