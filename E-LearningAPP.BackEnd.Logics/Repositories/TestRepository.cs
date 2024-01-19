using E_LearningAPP.BackEnd.Logics.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.Configuration;

namespace E_LearningAPP.BackEnd.Logics.Repositories
{
    public class TestRepository : ITestRepository
    {
        private readonly string? connection;
        public TestRepository(IConfiguration configuration)
        {
            connection = configuration.GetConnectionString("E-Learning");
        }
        public string TestMethod()
        {
            string returnedOutput = "";
            try
            {
                var responseBody = new
                {
                    Success = true,
                    Message = "OK"
                };
                returnedOutput = JsonSerializer.Serialize(responseBody);
            }
            catch (Exception ex)
            {
                var responseBody = new
                {
                    Success = false,
                    Message = $"Error : {ex.Message}"
                };
                returnedOutput = JsonSerializer.Serialize(responseBody);
            }
            return returnedOutput;
        }
    }
}
