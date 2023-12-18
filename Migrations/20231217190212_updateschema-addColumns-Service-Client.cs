using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kithtokin_web.Migrations
{
    /// <inheritdoc />
    public partial class updateschemaaddColumnsServiceClient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RequestID",
                table: "Services",
                type: "nvarchar(11)",
                maxLength: 11,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OtherType",
                table: "Clients",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequestID",
                table: "Services");

            migrationBuilder.DropColumn(
                name: "OtherType",
                table: "Clients");
        }
    }
}
