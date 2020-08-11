export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Appointments",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/appointments",
    },
    {
      title: "Customers",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "customers",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/profile",
    }
  ];
}
