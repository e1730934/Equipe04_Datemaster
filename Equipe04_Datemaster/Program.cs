using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using DbContext = Equipe04_Datemaster.DbContext;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add your DbContext configuration to the container
builder.Services.AddDbContext<DbContext>(options =>
{
    options.UseSqlite(
        "Data Source=C:\\Users\\bilal\\Documents\\RiderProjects\\Equipe04_Datemaster\\Equipe04_Datemaster\\Datemaster12.sqlite");
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

app.MapControllerRoute(
    "default",
    "{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    "api",
    "api/{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();