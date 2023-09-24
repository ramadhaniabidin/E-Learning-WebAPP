using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class PhysicsController : Controller
    {
        [Route("Course/Physics/{curr}/{grade}")]
        public IActionResult Index(string curr, int grade)
        {
            Console.WriteLine($"Curricullum = {curr}, Grade = {grade}");
            return View($"/Views/Physics/{curr}/{grade}/Index.cshtml");
            //return View();
        }

        [Route("Course/Physics/{curr}/{grade}/Topics/{topicName}")]
        public IActionResult Topic(string topicName, string curr, int grade)
        {
            Console.WriteLine($"Curricullum = {curr}, Grade = {grade}, Topic = {topicName}");
            return View($"/Views/Physics/{curr}/{grade}/Topics/{topicName}");
        }
    }
}
