using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class MathController : Controller
    {
        [Route("Course/Math/curr/{grade}")]
        public IActionResult Index(string curr, int grade)
        {
            return View($"/Views/Math/{curr}/{grade}/Index.cshtml");
        }
    }
}
