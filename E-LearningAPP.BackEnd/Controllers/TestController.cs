using E_LearningAPP.BackEnd.Logics.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.BackEnd.Controllers
{
    [Route("E-learning/BackEnd/[controller]/[action]")]
    [ApiController]
    public class TestController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}
        private readonly ITestRepository _itestRepo;
        public TestController(ITestRepository itestRepo)
        {
            _itestRepo = itestRepo;
        }
        [HttpGet]
        public IActionResult TestMethod()
        {
            var response = _itestRepo.TestMethod();
            return Ok(response);
        }
    }
}
