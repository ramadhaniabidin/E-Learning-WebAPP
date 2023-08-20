using E_LearningAPP.Models;
using Microsoft.AspNetCore.Mvc;

namespace E_LearningAPP.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        
        //public async void Login(SignUpModel model)
        //{
        //    string apiEndPoint = $"https://192.168.1.2:7290/E-learningAPI/Account/GetAccountID/username/{model.Username}/password/{model.Password}";
        //    using HttpClient client = new HttpClient();
        //    try
        //    {
        //        HttpResponseMessage response = await client.GetAsync(apiEndPoint);
        //        response.EnsureSuccessStatusCode();

        //        string content = await response.Content.ReadAsStringAsync();
        //        int accountId;

        //        if(int.TryParse(content, out accountId))
        //        {
        //            Console.WriteLine($"Account ID: {accountId}");
        //        }

        //        else
        //        {
        //            Console.WriteLine("Unable to parse account ID");
        //        }
        //    }

        //    catch(HttpRequestException ex)
        //    {
        //        Console.WriteLine($"Error: {ex.InnerException.Message}");
        //    }
        //}
    }
}
