using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class MathController : Controller
    {
        [Route("Course/Math/{grade}")]
        public IActionResult Index(int grade)
        {
            return View($"/Views/Math/{grade}/Index.cshtml");
        }
    }
}
