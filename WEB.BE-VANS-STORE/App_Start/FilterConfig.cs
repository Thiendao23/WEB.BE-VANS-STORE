using System.Web;
using System.Web.Mvc;

namespace WEB.BE_VANS_STORE
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
