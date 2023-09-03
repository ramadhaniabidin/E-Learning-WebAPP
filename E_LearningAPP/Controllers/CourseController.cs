using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    
    public class CourseController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Physics()
        {
            return View();
        }

        
        [Route("Course/Physics/{grade}")]
        public IActionResult PhysicsSelected(string grade)
        {
            return View();
        }
    }
}
