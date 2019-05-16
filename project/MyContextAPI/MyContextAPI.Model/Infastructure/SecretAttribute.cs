using System;
using System.Collections.Generic;
using System.Text;

namespace MyContextAPI.Model.Infastructure
{

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class SecretAttribute : Attribute
    {
    }
}
