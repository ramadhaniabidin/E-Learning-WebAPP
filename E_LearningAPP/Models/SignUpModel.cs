using System.ComponentModel.DataAnnotations;

namespace E_LearningAPP.Models
{
    public class SignUpModel
    {
        public string? Username { get; set; }
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$", ErrorMessage = "Input teks harus terdiri dari paling tidak 8 karakter dan mengandung huruf besar, huruf kecil, serta nomor.")]
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
    }
}
