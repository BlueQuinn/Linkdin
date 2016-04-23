function firstName(fullName, locale)
{
    var name = fullName.split(" ");
    if (locale == "EN")
        return name[0];
    if (locale == "VN")
        return name[name.length - 1];
}