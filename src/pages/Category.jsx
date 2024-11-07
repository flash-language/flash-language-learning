import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { WordsContext } from "../context/WordsContext";
import { Table, FloatingLabel } from "flowbite-react";

export default function Category() {
  const { categoryName } = useParams();
  const { getWordsByCategory, deleteWord } = useContext(WordsContext);
  const [categoryWords, setCategoryWords] = useState([]);

  useEffect(() => {
    const words = getWordsByCategory(categoryName);
    setCategoryWords(words);
  }, [categoryName, getWordsByCategory]);

  return (
    <>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h1 className="text-xl font-bold">Category: {categoryName}</h1>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell className="text-center p-3">English</Table.HeadCell>
            <Table.HeadCell className="text-center p-3">
              Difficulty
            </Table.HeadCell>
            <Table.HeadCell className="text-center p-3">French</Table.HeadCell>
            <Table.HeadCell className="text-center p-3">German</Table.HeadCell>
            <Table.HeadCell className="text-center p-3">Spanish</Table.HeadCell>
            <Table.HeadCell className="text-center p-3">Arabic</Table.HeadCell>
            <Table.HeadCell className="text-center p-3">
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {categoryWords.map((word) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={word.id}
              >
                <Table.Cell className="text-center p-3 font-medium text-gray-900 dark:text-white">
                  {word.english}
                </Table.Cell>
                <Table.Cell className="text-center p-3 font-medium text-gray-900 dark:text-white">
                  {word.difficulty}
                </Table.Cell>
                <Table.Cell className="text-center p-3 font-medium text-gray-900 dark:text-white">
                  {word.french}
                </Table.Cell>
                <Table.Cell className="text-center p-3 font-medium text-gray-900 dark:text-white">
                  {word.german}
                </Table.Cell>
                <Table.Cell className="text-center p-3 font-medium text-gray-900 dark:text-white">
                  {word.spanish}
                </Table.Cell>
                <Table.Cell className="text-center p-3 font-medium text-gray-900 dark:text-white">
                  {word.arabic}
                </Table.Cell>
                <Table.Cell className="text-center p-3">
                  <a
                    href="#"
                    onClick={() => {
                      deleteWord(word.id);
                      setCategoryWords((prevWords) =>
                        prevWords.filter((w) => w.id !== word.id)
                      );
                    }}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Delete
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
