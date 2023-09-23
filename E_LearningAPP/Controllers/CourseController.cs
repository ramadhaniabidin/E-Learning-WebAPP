using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    
    public class CourseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult TestPage()
        {
            return View();
        }
        //[Route("Course/Physics/{grade}")]
        //public IActionResult Physics(int grade)
        //{
        //    return View();
        //}
    }
}
