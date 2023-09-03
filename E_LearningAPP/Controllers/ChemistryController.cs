using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class ChemistryController : Controller
    {
        [Route("Course/Chemistry/{grade}")]
        public IActionResult Index(int grade)
        {
            return View($"/Views/Chemistry/{grade}/Index.cshtml");
        }
    }
}
