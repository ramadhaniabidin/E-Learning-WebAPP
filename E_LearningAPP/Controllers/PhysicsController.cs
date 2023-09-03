using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class PhysicsController : Controller
    {
        [Route("Course/Physics/{grade}")]
        public IActionResult Index(int grade)
        {
            Console.WriteLine($"Grade = {grade}");
            return View($"/Views/Physics/{grade}/Index.cshtml");
            //return View();
        }
    }
}
