import styled from "styled-components";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { Formik, Form, FieldArray } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";

import Input from "./Input";
import Image from "next/image";
import { useTimerData } from "../context/Timer";
import { useRouter } from "next/router";

interface Props {
  closeForm: () => void;
}

const MainWrapper = styled(motion.div)`
  max-height: 90vh;
  overflow: scroll;

  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: -10vh;

  padding: 1rem 0.5rem;
  padding-bottom: 15vh;
  border-radius: 5px 5px 0 0;
  background: ${({ theme }) => theme.primary};

  width: 95%;
  max-width: 30rem;

  @media (min-width: 425px) {
    padding: 1rem;
    padding-bottom: 15vh;
  }

  .block-heading {
    opacity: 0.75;
    display: block;
    margin-bottom: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.faded};
    font-size: 0.95rem;
  }

  .option-image {
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    height: 6rem;
    object-fit: cover;

    @media (min-width: 425px) {
      height: 10rem;
    }
  }

  .selected-image {
    transiton: all 0.3s ease-in-out;
    border: 3px solid ${({ theme }) => theme.accent};
    transform: scale(1.025);
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.faded};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.faded};

  .icon {
    cursor: pointer;
    font-size: 1.75rem;
    color: ${({ theme }) => theme.accent};
  }
`;

interface InputWrapperProps {
  columns: any;
}

const InputWrapper = styled.div<InputWrapperProps>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: 0.5rem;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 1rem;

  .block-heading {
    margin-bottom: 0;
  }
`;

const Toggle = styled.div`
  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 60px;
    height: 30px;
    background: ${({ theme }) => theme.faded};
    display: block;
    border-radius: 100px;
    position: relative;
  }

  label:after {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
  }

  input:checked + label {
    transition: all 0.3s ease-in-out;
    background: ${({ theme }) => theme.accent};
  }

  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  label:active:after {
    width: 40px;
  }
`;

interface PrimaryButtonProps {
  color: string;
}

const PrimaryButton = styled.button<PrimaryButtonProps>`
  width: 100%;
  max-width: 25rem;
  display: block;
  margin: 1.5rem auto 0 auto;

  border: none;
  outline: none;
  font-family: inherit;

  padding: 0.75rem;
  border-radius: 5px;
  font-weight: 700;
  background: ${({ theme, color }) => theme[color]};
  color: ${({ theme }) => theme.primary};

  cursor: pointer;

  &:disabled {
    opacity: 0.4;
  }
`;

const TaskAddWrapper = styled.div`
  .task-wrapper {
    display: grid;
    grid-template-columns: 8fr 2fr;
    align-items: start;
    gap: 1rem;
    margin-bottom: 0.5rem;

    & > * {
      margin-bottom: 0rem;
    }
  }
`;

const ambienceArray = [
  {
    id: 1,
    name: "waves",
    imagePath: "/images/waves-beach.gif",
    soundPath: "/audio/ocean-waves-audio.mp3",
  },
  {
    id: 2,
    name: "waterfall",
    imagePath: "/images/waterfall.gif",
    soundPath: "/audio/river-stream.mp3",
  },
  {
    id: 3,
    name: "rain",
    imagePath: "/images/rain.gif",
    soundPath: "/audio/rain-crickets.mp3",
  },
  {
    id: 4,
    name: "rain",
    imagePath: "/images/clock.gif",
    soundPath: "/audio/ticking.mp3",
  },
];

const NewTimerForm: React.FC<Props> = ({ closeForm }) => {
  const [selected, setSelected] = useState(1);

  const router = useRouter();
  const { updateTimerData } = useTimerData();

  return (
    <MainWrapper
      initial={{ y: "100%", x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      exit={{ y: "100%", x: "-50%" }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <Header>
        <span>Pomodoro Timer Settings</span>
        <BiChevronDown className="icon" onClick={closeForm} />
      </Header>
      <Formik
        enableReinitialize
        initialValues={{ work: 25, rest: 5, session: 3, ad: true, tasks: [] }}
        validationSchema={Yup.object().shape({
          tasks: Yup.array().of(Yup.string().required("Required")),
        })}
        onSubmit={(values, { setSubmitting }) => {
          updateTimerData({ ...values, ambience: ambienceArray[selected - 1] });
          setTimeout(() => {
            setSubmitting(false);
            closeForm();
            router.push("/pomodoro");
          }, 1000);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <span className="block-heading">Time (minutes)</span>
            <InputWrapper columns={3}>
              <Input name="work" placeholder="Work" type="number" />
              <Input name="rest" placeholder="Rest" type="number" />
              <Input name="session" placeholder="Session" type="number" />
            </InputWrapper>
            <span className="block-heading">Tasks ({values.tasks.length})</span>
            <FieldArray name="tasks">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { tasks } = values;
                return (
                  <TaskAddWrapper>
                    {tasks.map((task: string, index: number) => (
                      <div className="task-wrapper" key={index + 5}>
                        <Input
                          placeholder="New Task"
                          name={`tasks[${index}]`}
                        />
                        <PrimaryButton
                          color="faded"
                          onClick={(e) => {
                            e.preventDefault();
                            remove(index);
                          }}
                        >
                          Delete
                        </PrimaryButton>
                      </div>
                    ))}
                    <InputWrapper columns={2}>
                      <div className=""></div>
                      <PrimaryButton
                        color="accent"
                        onClick={(e) => {
                          e.preventDefault();
                          push("");
                        }}
                      >
                        Add Task
                      </PrimaryButton>
                    </InputWrapper>
                  </TaskAddWrapper>
                );
              }}
            </FieldArray>

            <span className="block-heading">Ambience</span>
            <InputWrapper columns={2}>
              {ambienceArray.map((item) => (
                <Image
                  onClick={() => setSelected(item.id)}
                  key={item.id}
                  src={item.imagePath}
                  height={50}
                  width={50}
                  alt=""
                  className={`option-image ${
                    item.id == selected && "selected-image"
                  }`}
                />
              ))}
            </InputWrapper>
            <FlexContainer>
              <span className="block-heading">Allow ads?</span>
              <Toggle>
                <input name="ad" type="checkbox" id="ad-switch" hidden />
                <label htmlFor="ad-switch">Toggle</label>
              </Toggle>
            </FlexContainer>

            <PrimaryButton disabled={isSubmitting} color="accent">
              {isSubmitting ? "Please wait..." : "Save And Continue"}
            </PrimaryButton>
          </Form>
        )}
      </Formik>
    </MainWrapper>
  );
};

export default NewTimerForm;
