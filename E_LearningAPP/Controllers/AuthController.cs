using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
