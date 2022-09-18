using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class RevertIdentityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2e43986e-7d93-40fa-8d55-dc194739a74f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4544af32-b050-47a7-906c-82c21ac3510c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "10c8631e-e4c1-4a97-9b72-a5a07d74b2bd", "3bf4f6e4-7481-47d9-8e6f-9cd9cc4fb95a", "Member", "MEMBER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "300c1629-c94c-4ce6-b2ec-4578a11b1a00", "a41f281f-8c48-49e1-ac9c-711d94de1e9d", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "10c8631e-e4c1-4a97-9b72-a5a07d74b2bd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "300c1629-c94c-4ce6-b2ec-4578a11b1a00");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "2e43986e-7d93-40fa-8d55-dc194739a74f", "65bbb6e7-3708-4398-a055-9b210a5cfe37", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "4544af32-b050-47a7-906c-82c21ac3510c", "348169f8-d9f8-48e2-9f4f-5ad2c4a44932", "Member", "MEMBER" });
        }
    }
}
