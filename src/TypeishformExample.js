import React, {Component} from 'react';
import {Form} from 'react-form';
import {ShortText, LongText, YesNo, MultipleChoice, Block} from './Typeishform'

class TypeishformExample extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(submittedValues) {
    this.setState({ submittedValues });

    alert("Check the console for the form values!");

    console.log(submittedValues)
  }

  render() {
    return (
      <Form onSubmit={ this.handleSubmit.bind(this) }>
        {formApi => (
          <form onSubmit={formApi.submitForm} id="exampleTypeishform">
            <div className="form-row">
              <ShortText field="firstName" title="First Name" placeholder="Enter First Name" helpText="Do it!" cols={6} />
              <ShortText field="lastName" title="Last Name" placeholder="Enter Last Name" helpText="Please?" cols={6} />

              <YesNo field="tellMeWhatYouWant" title="Will you tell me what you want?" />
              <YesNo field="whatYouReallyReallyWant" title="What you really really want??" helpText="">
                { foo =>
                  <YesNo field="tellYouWhatIwant" title="Will I tell you what I want, what I really really want?" helpText="">
                    <div>I wanna really, really, really wanna zigazig ah</div>
                  </YesNo>
                }
              </YesNo>

              <MultipleChoice field="doYou" title="Do you.." helpText="Choices are good.." choices={[
                {"field":"wantMyFuture", "label": "Want my future?"},
                {"field":"wantToGetWithMe", "label": "Want to get with me?"},
              ]} />

              <LongText field="storyFromAZ" title="Tell me a story from A to Z" placeholder="You wanna get with me, you gotta listen carefully.." cols={6} />

              <Block field="inABlock" title="I am a block, and I'm containing stuff, and..">
                <ShortText field="blockText" title="We're in a block!" helpText="Take a good hard look at this super shiny block!" />
              </Block>
            </div>

            FormValues (DEBUG):
            <pre>
                {JSON.stringify(formApi.getFormState().values, null, 2)}
              </pre>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </Form>
    )
  }
}

export default TypeishformExample;