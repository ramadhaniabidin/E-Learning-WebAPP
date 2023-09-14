using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class ChemistryController : Controller
    {
        [Route("Course/Chemistry/{curr}/{grade}")]
        public IActionResult Index(string curr, int grade)
        {
            return View($"/Views/Chemistry/{curr}/{grade}/Index.cshtml");
        }
    }
}
