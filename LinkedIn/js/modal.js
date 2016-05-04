
function addSkill(type)
{
    editor.content.skill[type].push({ name: "", xp: 0 });
    editor.$apply();
}
