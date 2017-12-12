using MeetupApi.Data;
using MeetupApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MeetupApi.Controllers
{
    /// <summary>
    /// Controller responsável pelas operações de meetup
    /// </summary>
    [Route("api/meetup")]
    [Produces("application/json")]
    public class MeetupController : BaseController
    {
        /// <summary>
        /// Construtor da classe
        /// </summary>
        /// <param name="context">Contexto do Entity Framework</param>
        public MeetupController(MeetupApiContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Contexto do Entity Framework
        /// </summary>
        private readonly MeetupApiContext _context;

        /// <summary>
        /// Incluir um meetup
        /// </summary>
        /// <param name="meetup">Dados do meetup</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> PostMeetup([FromBody] Meetup meetup)
        {
            if (!ModelState.IsValid)
            {
                return Response();
            }

            if (meetup.Data < DateTime.Now)
            {
                AdicionarModelError("A data do Meetup não pode ser no passado");
                return Response();
            }

            _context.Meetup.Add(meetup);
            await _context.SaveChangesAsync();

            return Response(_context.Meetup.Find(meetup.Id));
        }

        /// <summary>
        /// Retornar uma lista de meetups cadastrados
        /// </summary>
        /// <returns>Lista de meetups</returns>
        [HttpGet]
        public async Task<IActionResult> GetMeetup()
        {
            var meetups = await _context.Meetup.ToListAsync();
            return Response(meetups);
        }

        /// <summary>
        /// Retornar um meetup
        /// </summary>
        /// <param name="id">Identificação do meetup</param>
        /// <returns>Meetup</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeetup([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return Response();
            }

            var meetup = await _context.Meetup.SingleOrDefaultAsync(m => m.Id == id);

            if (meetup == null)
            {
                AdicionarModelError("Meetup não encontrado");
                return Response();
            }

            return Response(meetup);
        }

        /// <summary>
        /// Alterar um meetup
        /// </summary>
        /// <param name="id">Identificação do Meetup</param>
        /// <param name="meetup">Dados do meetup</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeetup([FromRoute] int id, [FromBody] Meetup meetup)
        {
            if (!ModelState.IsValid)
            {
                return Response();
            }

            if (id != meetup.Id)
            {
                AdicionarModelError("O ID do Meetup não é válido");
                return Response();
            }

            if (meetup.Data < DateTime.Now)
            {
                AdicionarModelError("A data do Meetup não pode ser no passado");
                return Response();
            }

            _context.Entry(meetup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!MeetupExists(id))
                {
                    ModelState.AddModelError(string.Empty, "Meetup não encontrado");
                    return Response();
                }
                else
                {
                    throw;
                }
            }

            return Response();
        }

        /// <summary>
        /// Apagar um meetup
        /// </summary>
        /// <param name="id">Identificação do Meetup</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeetup([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return Response();
            }

            var meetup = await _context.Meetup.SingleOrDefaultAsync(m => m.Id == id);
            if (meetup == null)
            {
                AdicionarModelError("Meetup não encontrado");
                return Response();
            }

            _context.Meetup.Remove(meetup);
            await _context.SaveChangesAsync();

            return Response(meetup);
        }

        /// <summary>
        /// Verificar a existência de um meetup
        /// </summary>
        /// <param name="id">Identificação do Meetup</param>
        /// <returns>Resultado da consulta</returns>
        private bool MeetupExists(int id)
        {
            return _context.Meetup.Any(e => e.Id == id);
        }
    }
}
