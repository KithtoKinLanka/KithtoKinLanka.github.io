using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace kithtokin_web.Migrations
{
    /// <inheritdoc />
    public partial class updatecolumnNameotherTypeclient : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OtherType",
                table: "Clients",
                newName: "OtherResidentType");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OtherResidentType",
                table: "Clients",
                newName: "OtherType");
        }
    }
}
