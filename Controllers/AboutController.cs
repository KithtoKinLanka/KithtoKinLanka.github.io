using Microsoft.AspNetCore.Mvc;

namespace kithtokin_web.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult WhoWeAre()
        {
            return Redirect(Url.Action("Index", "About") + "#who_we_are"); 
        }

        public IActionResult OurCommunity()
        {
            return Redirect(Url.Action("Index", "About") + "#our_community");
        }
    }
}
