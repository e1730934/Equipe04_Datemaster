using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using DbContext = Equipe04_Datemaster.DbContext;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add your DbContext configuration to the container
builder.Services.AddDbContext<DbContext>(options =>
{
    var path = Path.Combine(Directory.GetCurrentDirectory(), "Datemaster.sqlite");
    options.UseSqlite($"Data Source={path}");

});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAllOrigins");
app.UseAuthorization();

app.MapControllerRoute(
    "default",
    "{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    "api",
    "api/{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();