using Employee.Api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;    

namespace Employee.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public EmployeeMasterController(EmployeeDbContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeMaster
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<EmployeeData>>> GetEmployees()
        {
            return await _context.EmployeeData.ToListAsync();
        }

        // GET: api/EmployeeMaster/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeData>> GetEmployee(int id)
        {
            var employee = await _context.EmployeeData.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/EmployeeMaster/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EmployeeData employee)
        {
            if (id != employee.employeeId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        // POST: api/EmployeeMaster
        [HttpPost]
        public async Task<ActionResult<EmployeeData>> PostEmployee(EmployeeData employee)
        {
            _context.EmployeeData.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.employeeId }, employee);
        }

        
        // DELETE: api/EmployeeMaster/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.EmployeeData.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.EmployeeData.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool EmployeeExists(int id)
        {
            return _context.EmployeeData.Any(e => e.employeeId == id);
        }
    }
}