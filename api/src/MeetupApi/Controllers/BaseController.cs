using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MeetupApi.Controllers
{
    public class BaseController : Controller
    {
        protected new IActionResult Response(object result = null)
        {
            if (ModelState.IsValid)
            {
                return Ok(new
                {
                    success = true,
                    data = result
                });
            }

            return BadRequest(new
            {
                success = false,
                errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
            });
        }

        protected void AdicionarModelError(string descricao)
        {
            ModelState.AddModelError(string.Empty, descricao);
        }
    }
}
