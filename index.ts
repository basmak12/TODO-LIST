#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bgBlue.bold(" \n \t Welcome To Basma Khan Todo List App\n"));

let todos: any[] = [];
let condition=true;

  async function main() {
    while(condition) {
        let choice = await inquirer.prompt([
            {
                name:"option",
                type:"list",
                message :"choose an option",
                choices:["Add Task", "Read Tasks", "Update Task", "Delete Task","Exit"]

            }
        ]);

        switch(choice.option) {
            case "Add Task":
            await addTask();
                  break;
             case "Read Tasks":
              readTasks();
                 break;
             case "Update Task":
             await updateTask();
                    break;
             case "Delete Task":
             await deleteTask();
                    break;
             case "Exit":
             condition = false;
            console.log(chalk.red.bold("Exiting..."));
                    break;
                
        }
    }
}

async function addTask() {
    let addTask = await inquirer.prompt([
        {
        name:"todo",
        type:"input",
        message:"what do you want to add to your todos?",
        }
    ]);
    todos.push(addTask.todo);
    console.log(chalk.bgBlueBright(`\n \t${addTask.todo} task added to todo list.\n`));
}

function readTasks(){
    console.log(chalk.bgYellow.bold(`\n \t Your Todo List:\n`));
    todos.forEach((task,index)=> {
    console.log(chalk.bgGreenBright.bold(`\n \t ${index + 1}. ${task}\n`));
    });
}

async function updateTask() {
    if(todos.length === 0) {
        console.log(chalk.yellow("No tasks to update."));
        return;
    }
    let updateChoice = await inquirer.prompt([
        {
            name: "index",
            type:"number",
            message:"Enter the index of the task you want to update:",
            validate:input => input > 0 && input <= todos.length || "Invalid index."
        },
        {
            name:"updateTask",
            type:"input",
            message:"Enter the update task:"
        }
    ]);
    todos[updateChoice.index - 1] = updateChoice.updateTask;
    console.log(chalk.bgBlack.bold(`\n \t Task update successfully.\n`));
}

async function deleteTask(){
    if(todos.length === 0) {
        console.log(chalk.bgGrey("No tasks to delete."));
        return;
}
    let deleteChoice = await inquirer.prompt([
        {
            name: "index",
            type:"number",
            message:"Enter the index of the task you want to delete:",
            validate:input => input > 0 && input <= todos.length || "Invalid index"
        }
    ]);
    todos.splice(deleteChoice.index -1,1);
    console.log(chalk.bgMagentaBright.bold(`\n \t Task deleted sucessfully.\n`));
    
}
main();