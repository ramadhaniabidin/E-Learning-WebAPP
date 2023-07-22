using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class ProfileController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
