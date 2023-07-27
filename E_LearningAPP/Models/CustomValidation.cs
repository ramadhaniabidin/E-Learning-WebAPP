using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace E_LearningAPP.Models
{
    public class CustomValidation: ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null || value is string)
            {
                return false;
            }
            string password = (string)value;
            if(password.Length < 8)
            {
                return false;
            }

            if(!Regex.IsMatch(password, @"[A-Z]"))
            {
                return false;
            }

            if(!Regex.IsMatch(password, @"[a-z]"))
            {
                return false;
            }
             if(!Regex.IsMatch(password, @"\d"))
            {
                return false;
            }

             return true;
        }
    }
}
